//////////////////////////////////////////////////////
// MK Glow RenderTargetContext 	    	    	    //
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
    //To reduce garbage collection this part is hardcoded
    /// <summary>
    /// Render targets based on a given render context
    /// </summary>
	internal static class RenderTargetContext
	{
		private static int _renderTargetCount;

        private static RenderTargetSetup[] _mrtBindingsLegacy = new RenderTargetSetup[6]
        {
            new RenderTargetSetup
            (
                new RenderBuffer[1], 
                new RenderBuffer(),
                0,
                CubemapFace.Unknown,
                new RenderBufferLoadAction[1]{RenderBufferLoadAction.DontCare},
                new RenderBufferStoreAction[1]{RenderBufferStoreAction.Store},
                RenderBufferLoadAction.DontCare, RenderBufferStoreAction.Store
            ) 
            #if UNITY_2018_3_OR_NEWER
            { depthSlice = -1 }
            #endif
            ,
            new RenderTargetSetup
            (
                new RenderBuffer[2], 
                new RenderBuffer(),
                0,
                CubemapFace.Unknown,
                new RenderBufferLoadAction[2]{RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare},
                new RenderBufferStoreAction[2]{RenderBufferStoreAction.Store, RenderBufferStoreAction.Store},
                RenderBufferLoadAction.DontCare, RenderBufferStoreAction.Store
            )
            #if UNITY_2018_3_OR_NEWER
            { depthSlice = -1 }
            #endif
            ,
            new RenderTargetSetup
            (
                new RenderBuffer[3], 
                new RenderBuffer(),
                0,
                CubemapFace.Unknown,
                new RenderBufferLoadAction[3]{RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare},
                new RenderBufferStoreAction[3]{RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store},
                RenderBufferLoadAction.DontCare, RenderBufferStoreAction.Store
            )
            #if UNITY_2018_3_OR_NEWER
            { depthSlice = -1 }
            #endif
            ,
            new RenderTargetSetup
            (
                new RenderBuffer[4], 
                new RenderBuffer(),
                0,
                CubemapFace.Unknown,
                new RenderBufferLoadAction[4]{RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare},
                new RenderBufferStoreAction[4]{RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store},
                RenderBufferLoadAction.DontCare, RenderBufferStoreAction.Store
            )
            #if UNITY_2018_3_OR_NEWER
            { depthSlice = -1 }
            #endif
            ,
            new RenderTargetSetup
            (
                new RenderBuffer[5], 
                new RenderBuffer(),
                0,
                CubemapFace.Unknown,
                new RenderBufferLoadAction[5]{RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare},
                new RenderBufferStoreAction[5]{RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store},
                RenderBufferLoadAction.DontCare, RenderBufferStoreAction.Store
            )
            #if UNITY_2018_3_OR_NEWER
            { depthSlice = -1 }
            #endif
            ,
            new RenderTargetSetup
            (
                new RenderBuffer[6], 
                new RenderBuffer(),
                0,
                CubemapFace.Unknown,
                new RenderBufferLoadAction[6]{RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare, RenderBufferLoadAction.DontCare},
                new RenderBufferStoreAction[6]{RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store, RenderBufferStoreAction.Store},
                RenderBufferLoadAction.DontCare, RenderBufferStoreAction.Store
            )
            #if UNITY_2018_3_OR_NEWER
            { depthSlice = -1 }
            #endif
        };

		internal static void SetRenderTargetContext(List<RenderTexture> renderTargets)
		{
			_renderTargetCount = renderTargets.Count - 1;
            for(int i = 0; i <= _renderTargetCount; i++)
            {
                _mrtBindingsLegacy[_renderTargetCount].color[i] = renderTargets[i].colorBuffer;
            }
            _mrtBindingsLegacy[_renderTargetCount].depth = renderTargets[_renderTargetCount].depthBuffer;
            Graphics.SetRenderTarget(_mrtBindingsLegacy[_renderTargetCount]);
		}
	}
}
