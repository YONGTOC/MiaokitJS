//////////////////////////////////////////////////////
// MK Glow Extensions   	    	       			//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace MK.Glow
{
    using ShaderProperties = PipelineProperties.ShaderProperties;
    #if UNITY_2018_3_OR_NEWER
    using XRSettings = UnityEngine.XR.XRSettings;
    #endif

    internal static class PipelineExtensions
    {
        private static Mesh _screenMesh;
        private static Mesh screenMesh
        {
            get
            {
                if(_screenMesh == null)
                {
                    _screenMesh = new Mesh { name = "MKGlowScreenMesh" };

                    _screenMesh.SetVertices(new List<Vector3>
                    {
                        new Vector3(-1f, -1f, 0f),
                        new Vector3( 3f, -1f, 0f),
                        new Vector3(-1f,  3f, 0f)
                    });

                    _screenMesh.SetIndices(new[] { 0, 1, 2 }, MeshTopology.Triangles, 0, false);
                    _screenMesh.UploadMeshData(false);
                }
                
                return _screenMesh;
            }
        }

        /// <summary>
        /// Enable or disable a specific Shader keyword
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="enable"></param>
        internal static void SetKeyword(string keyword, bool enable)
        {
            if(enable)
                Shader.EnableKeyword(keyword);
            else
                Shader.DisableKeyword(keyword);
        }

        /// <summary>
        /// Draw the currently setuped render context with its targets
        /// </summary>
        /// <param name="destinations"></param>
        /// <param name="material"></param>
        /// <param name="pass"></param>
        internal static void Draw(List<RenderTexture> destinations, Material material, int pass)
        {
            RenderTargetContext.SetRenderTargetContext(destinations);
            material.SetPass(pass);
            Graphics.DrawMeshNow(screenMesh, Vector3.zero, Quaternion.identity);
        }

        /// <summary>
        /// Scaling size correctly, need if single pass stereo is enabled
        /// </summary>
        /// <param name="cameraIsStereo"></param>
        /// <param name="size"></param>
        /// <param name="scale"></param>
        /// <returns></returns>
        private static int SinglePassStereoDownscale(bool cameraIsStereo, int size, int scale)
        {
            //using single pass stereo can introduce some Texeloffset which makes the rendering occur on the wrong place
            //This happens because the samples are build on base of different mip levels
            //single pass stereo TexelSize needs to be adjusted in the shader too
            #if UNITY_2017_1_OR_NEWER
            return cameraIsStereo && PipelineProperties.singlePassStereoDoubleWideEnabled && ((size / 2) % 2 > 0) ? 1 + size / scale : size / scale;
            #else
            return size / scale;
            #endif
        }

        /// <summary>
        /// Update a mip based render context array
        /// </summary>
        /// <param name="camera"></param>
        /// <param name="renderContexts"></param>
        /// <param name="rawDimension"></param>
        /// <param name="levels"></param>
        /// <param name="format"></param>
        /// <param name="depthBufferBits"></param>
        /// <param name="enableRandomWrite"></param>
        internal static void UpdateMipRenderContext(this Camera camera, RenderContext[] renderContexts, RenderDimension rawDimension, int levels, RenderTextureFormat format, int depthBufferBits)
        {
            for(int i = 0; i < levels; i++)
            {
                renderContexts[i].UpdateRenderContext(camera, format, depthBufferBits, rawDimension);
                rawDimension.width = Mathf.Max(SinglePassStereoDownscale(camera.stereoEnabled, rawDimension.width, 2), 1);
                rawDimension.height = Mathf.Max(SinglePassStereoDownscale(camera.stereoEnabled, rawDimension.height, 2), 1);
            }
        }

        /// <summary>
        /// Get a temporary render texture
        /// </summary>
        /// <param name="renderContext"></param>
        /// <param name="format"></param>
        /// <returns></returns>
        internal static RenderTexture GetTemporary(RenderContext renderContext, RenderTextureFormat format)
        {
            #if UNITY_2017_1_OR_NEWER
            return RenderTexture.GetTemporary(renderContext.descriptor);
            #else
            RenderTexture renderTexture = RenderTexture.GetTemporary(renderContext.width, renderContext.height, 16, format, RenderTextureReadWrite.Default, 1);
            renderTexture.enableRandomWrite = renderContext.enableRandomWrite;
            return renderTexture;
            #endif
        }
    }
}