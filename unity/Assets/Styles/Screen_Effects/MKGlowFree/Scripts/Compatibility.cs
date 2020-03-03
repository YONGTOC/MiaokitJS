//////////////////////////////////////////////////////
// MK Glow Compatibility	    	    	       	//
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
    #if UNITY_2018_3_OR_NEWER
    using XRSettings = UnityEngine.XR.XRSettings;
    #endif

	public static class Compatibility
    {
        private static readonly bool _defaultHDRFormatSupported = SystemInfo.SupportsRenderTextureFormat(RenderTextureFormat.DefaultHDR);

        /// <summary>
        /// Returns the supported rendertexture format used for rendering
        /// </summary>
        /// <returns></returns>
        internal static RenderTextureFormat CheckSupportedRenderTextureFormat()
        {
            return _defaultHDRFormatSupported ? RenderTextureFormat.DefaultHDR : RenderTextureFormat.Default;
        }
    }
}