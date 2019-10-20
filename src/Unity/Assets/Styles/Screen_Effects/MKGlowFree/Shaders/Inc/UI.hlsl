//Based on unity builtin shader
//Currently this include only works for the default UI
#ifndef MK_GLOW_UI
    #define MK_GLOW_UI

    #if defined(_EMISSION)
        #define EMISSION
    #elif defined(_EMISSION_ONLY)
        #define EMISSION_ONLY
    #endif

    struct appdata_t
    {
        float4 vertex   : POSITION;
        float4 color    : COLOR;
        float2 texcoord : TEXCOORD0;
        UNITY_VERTEX_INPUT_INSTANCE_ID
    };

    struct v2f
    {
        float4 vertex   : SV_POSITION;
        fixed4 color    : COLOR;
        float2 texcoord  : TEXCOORD0;
        float4 worldPosition : TEXCOORD1;
        UNITY_VERTEX_OUTPUT_STEREO
    };

    sampler2D _MainTex;
    fixed4 _Color;
    fixed4 _TextureSampleAdd;
    float4 _ClipRect;
    float4 _MainTex_ST;
    
    #if defined(EMISSION) || defined(EMISSION_ONLY)
        uniform fixed3 _EmissionColor;
        uniform sampler2D _EmissionMap;
    #endif

    v2f vert(appdata_t v)
    {
        v2f OUT;
        UNITY_SETUP_INSTANCE_ID(v);
        UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(OUT);
        OUT.worldPosition = v.vertex;
        OUT.vertex = UnityObjectToClipPos(OUT.worldPosition);

        OUT.texcoord = TRANSFORM_TEX(v.texcoord, _MainTex);

        OUT.color = v.color * _Color;
        return OUT;
    }

    fixed4 frag(v2f IN) : SV_Target
    {
        half4 color = (tex2D(_MainTex, IN.texcoord) + _TextureSampleAdd) * IN.color;

        #ifdef UNITY_UI_CLIP_RECT
        color.a *= UnityGet2DClipping(IN.worldPosition.xy, _ClipRect);
        #endif

        #ifdef UNITY_UI_ALPHACLIP
        clip (color.a - 0.001);
        #endif
        
        #if defined(EMISSION)
            fixed4 g = tex2D(_EmissionMap, IN.texcoord);
            g.rgb *= _EmissionColor;
            color.rgb += g.rgb * g.a;
        #elif defined(EMISSION_ONLY)
		    fixed4 g = tex2D(_EmissionMap, IN.texcoord);
            g.rgb *= _EmissionColor;
            color.rgb = g.rgb * g.a;
        #endif

        return color;
    }

#endif
