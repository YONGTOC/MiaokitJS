//////////////////////////////////////////////////////
// MK Glow Common       	    	    	       	//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
namespace MK.Glow
{
    /// <summary>
    /// Type of the glow, selective requires seperate shaders
    /// </summary>
    public enum Workflow
    {
        Threshold = 0,
        Selective = 1
    }

    /// <summary>
    /// Debugging, Raw = Glowmap, default = pre ready, composite = Finalglow without Source image
    /// </summary>
    public enum DebugView
    {
        None = 0,
        RawBloom = 1,
        Bloom = 4,
    }

    /// <summary>
    /// Dimension struct for representing render context size
    /// </summary>
    public struct RenderDimension : IDimension
    {
		public RenderDimension(int width, int height) : this()
        {
            this.width = width;
            this.height = height;
        }

        public int width { get; set; }
        public int height { get; set; }
        public RenderDimension renderDimension { get{ return this; } }
    }
}
