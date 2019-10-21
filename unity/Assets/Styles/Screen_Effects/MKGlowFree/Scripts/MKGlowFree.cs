//////////////////////////////////////////////////////
// MK Glow 	    	    	                        //
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace MK.Glow.Legacy
{
	#if UNITY_2018_3_OR_NEWER
        [ExecuteAlways]
    #else
        [ExecuteInEditMode]
    #endif
    [DisallowMultipleComponent]
    [ImageEffectAllowedInSceneView]
    [RequireComponent(typeof(Camera))]
	public class MKGlowFree : MonoBehaviour
	{
        #if UNITY_EDITOR
        public bool showEditorMainBehavior = true;
		public bool showEditorBloomBehavior;
		public bool showEditorLensSurfaceBehavior;
		public bool showEditorLensFlareBehavior;
		public bool showEditorGlareBehavior;
        #endif

        //Main
        public DebugView debugView = MK.Glow.DebugView.None;
        public Workflow workflow = MK.Glow.Workflow.Threshold;
        public LayerMask selectiveRenderLayerMask = -1;

        //Bloom
        [MK.Glow.MinMaxRange(0, 10)]
        public MinMaxRange bloomThreshold = new MinMaxRange(1.0f, 10f);
        [Range(1f, 10f)]
		public float bloomScattering = 7f;
		public float bloomIntensity = 1f;

        private readonly string legacyBlitKeyword = "_COLOROVERLAY_ON";

        private Effect _effect;

		private Camera renderingCamera
		{
			get { return GetComponent<Camera>(); }
		}

		public void OnEnable()
		{
            _effect = new Effect();
			_effect.Enable();
		}

		public void OnDisable()
		{
			_effect.Disable();
		}

        private void OnRenderImage(RenderTexture source, RenderTexture destination)
        {
            if(workflow == Workflow.Selective && PipelineProperties.xrEnabled)
            {
                Graphics.Blit(source, destination);
                return;
            }
            
			_effect.Build(source, destination, this, renderingCamera);

            Shader.EnableKeyword(legacyBlitKeyword);
            Graphics.Blit(source, destination, _effect.renderMaterialNoGeometry, _effect.currentRenderIndex);
            Shader.DisableKeyword(legacyBlitKeyword);
            _effect.AfterCompositeCleanup();
        }
	}
}