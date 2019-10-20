//////////////////////////////////////////////////////
// MK Glow Settings 	    	    	       		//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace MK.Glow
{
    //The default settings for each pipeline is set in the script itself
    //this could be optimized some day...
    //Used for passing user based settings into the pipeline
    internal struct Settings
    {
        //Main
        private MK.Glow.DebugView _debugView;
        internal MK.Glow.DebugView debugView
        { 
            get { return _debugView; }
            set { _debugView = value; }
        }

        private MK.Glow.Workflow _workflow;
        internal MK.Glow.Workflow workflow
        { 
            get { return _workflow; }
            set { _workflow = value; }
        }

        private LayerMask _selectiveRenderLayerMask;
        internal LayerMask selectiveRenderLayerMask
        { 
            get { return _selectiveRenderLayerMask; }
            set { _selectiveRenderLayerMask = value; }
        }

        //Bloom
		private MK.Glow.MinMaxRange _bloomThreshold;
		internal MK.Glow.MinMaxRange bloomThreshold
		{ 
			get { return _bloomThreshold; }
			set { _bloomThreshold = value; }
		}

		private float _bloomScattering;
		internal float bloomScattering
		{ 
			get { return _bloomScattering; }
			set { _bloomScattering = Mathf.Clamp(value, 0f, 10f); }
		}
        
		private float _bloomIntensity;
		internal float bloomIntensity
		{ 
			get { return _bloomIntensity; }
			set { _bloomIntensity = Mathf.Max(0, value); }
		}

        public static implicit operator Settings(MK.Glow.Legacy.MKGlowFree input)
        {
            Settings settings = new Settings();
            
            //Main
            settings.debugView = input.debugView;
            settings.workflow = input.workflow;
            settings.selectiveRenderLayerMask = input.selectiveRenderLayerMask;

            //Bloom
            settings.bloomThreshold = input.bloomThreshold;
            settings.bloomScattering = input.bloomScattering;
            settings.bloomIntensity = input.bloomIntensity;

            return settings;
        }
    }
}
