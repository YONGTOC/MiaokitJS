//////////////////////////////////////////////////////
// MK Glow Resources	    	    	       		//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/*
#if UNITY_EDITOR
using UnityEditor;
#endif
*/

#pragma warning disable
namespace MK.Glow
{
    [System.Serializable]
    /// <summary>
    /// Stores runtime required resources
    /// </summary>
    public sealed class Resources : ScriptableObject
    {        
        internal static void ResourcesNotAvailableWarning()
        {
            Debug.LogWarning("MK Glow resources asset couldn't be found. Effect will be skipped.");
        }

        internal static MK.Glow.Resources LoadResourcesAsset()
        {
            return UnityEngine.Resources.Load<MK.Glow.Resources>("MKGlowResources");
        }

        /*
        #if UNITY_EDITOR
        //[MenuItem("Window/MK/Glow/Create Resources Asset")]
        static void CreateAsset()
        {
            Resources asset = ScriptableObject.CreateInstance<Resources>();

            AssetDatabase.CreateAsset(asset, "Assets/_MK/MKGlow/Resources.asset");
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();

            EditorUtility.FocusProjectWindow();

            Selection.activeObject = asset;
        }
        #endif
        */

        [SerializeField]
        private Shader _selectiveRenderShader;
        internal Shader selectiveRenderShader { get { return _selectiveRenderShader; } }
        [SerializeField]
        private Shader _sm20Shader;
        internal Shader sm20Shader { get { return _sm20Shader; } }
        [SerializeField]
        private Shader _sm25Shader;
        internal Shader sm25Shader { get { return _sm25Shader; } }
        [SerializeField]
        private Shader _sm30Shader;
        internal Shader sm30Shader { get { return _sm30Shader; } }
        [SerializeField]
        private Shader _sm35Shader;
        internal Shader sm35Shader { get { return _sm35Shader; } }
        [SerializeField]
        private Shader _sm40Shader;
        internal Shader sm40Shader { get { return _sm40Shader; } }
    }
}