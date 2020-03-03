//////////////////////////////////////////////////////
// MK Glow Mip Buffer	    	    	       		//
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

	/// <summary>
	/// Renderbuffer based on a mip setup
	/// </summary>
	internal sealed class MipBuffer
	{
		private RenderTexture[] _renderTargets = new RenderTexture[PipelineProperties.renderBufferSize];
		internal RenderTexture[] renderTargets { get { return _renderTargets; } }

		private int[] _identifiers = new int[PipelineProperties.renderBufferSize];
		internal int[] identifiers { get { return _identifiers; } }

		public MipBuffer(string name)
		{
			for(int i = 0; i < PipelineProperties.renderBufferSize; i++)
			{
				identifiers[i] = Shader.PropertyToID(name + i);
			}
		}

		/// <summary>
		/// Create a specific level of the the buffer
		/// </summary>
		/// <param name="renderContext"></param>
		/// <param name="level"></param>
		/// <param name="format"></param>
		internal void CreateTemporary(RenderContext[] renderContext, int level, RenderTextureFormat format)
		{
			renderTargets[level] = PipelineExtensions.GetTemporary(renderContext[level], format);
		}

		/// <summary>
		/// Clear a specific level of the buffer
		/// </summary>
		/// <param name="level"></param>
		internal void ClearTemporary(int level)
		{
			RenderTexture.ReleaseTemporary(renderTargets[level]);
		}
	}
}