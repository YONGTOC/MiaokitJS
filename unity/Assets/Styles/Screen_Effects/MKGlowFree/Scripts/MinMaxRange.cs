//////////////////////////////////////////////////////
// MK Glow MinMaxRange	    	    	       		//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

namespace MK.Glow
{
	//Attribute for Range
	public sealed class MinMaxRangeAttribute : PropertyAttribute
	{
		public float minLimit, maxLimit;

		public MinMaxRangeAttribute(float minLimit, float maxLimit)
		{
			this.minLimit = minLimit;
			this.maxLimit = maxLimit;
		}
	}

	//Range as struct
	[System.Serializable]
	public struct MinMaxRange
	{
		public float minValue, maxValue;

		public MinMaxRange(float minValue, float maxValue)
		{
			this.minValue = minValue;
			this.maxValue = maxValue;
		}
	}
}