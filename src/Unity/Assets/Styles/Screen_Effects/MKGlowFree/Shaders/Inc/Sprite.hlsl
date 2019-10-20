//Based on unity builtin shader
#ifndef MK_GLOW_SPRITE
    #define MK_GLOW_SPRITE

    #ifdef _EMISSION_ONLY
        #define EMISSION_ONLY
    #endif

    #include "UnityCG.cginc"

    #ifdef UNITY_INSTANCING_ENABLED

        UNITY_INSTANCING_BUFFER_START(PerDrawSprite)
            UNITY_DEFINE_INSTANCED_PROP(fixed4, unity_SpriteRendererColorArray)
            UNITY_DEFINE_INSTANCED_PROP(fixed2, unity_SpriteFlipArray)
        UNITY_INSTANCING_BUFFER_END(PerDrawSprite)

        #define _RendererColor  UNITY_ACCESS_INSTANCED_PROP(PerDrawSprite, unity_SpriteRendererColorArray)
        #define _Flip           UNITY_ACCESS_INSTANCED_PROP(PerDrawSprite, unity_SpriteFlipArray)

    #endif 

    CBUFFER_START(UnityPerDrawSprite)
    #ifndef UNITY_INSTANCING_ENABLED
        fixed4 _RendererColor;
        fixed2 _Flip;
    #endif
        float _EnableExternalAlpha;
    CBUFFER_END

    fixed4 _Color;
    uniform fixed3 _EmissionColor;
    uniform sampler2D _EmissionMap;

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
        float2 texcoord : TEXCOORD0;
        UNITY_VERTEX_OUTPUT_STEREO
    };

    inline float4 UnityFlipSprite(in float3 pos, in fixed2 flip)
    {
        return float4(pos.xy * flip, pos.z, 1.0);
    }

    v2f SpriteVert(appdata_t IN)
    {
        v2f OUT;

        UNITY_SETUP_INSTANCE_ID (IN);
        UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(OUT);

        OUT.vertex = UnityFlipSprite(IN.vertex, _Flip);
        OUT.vertex = UnityObjectToClipPos(OUT.vertex);
        OUT.texcoord = IN.texcoord;
        OUT.color = IN.color * _Color * _RendererColor;

        #ifdef PIXELSNAP_ON
        OUT.vertex = UnityPixelSnap (OUT.vertex);
        #endif

        return OUT;
    }

    sampler2D _MainTex;
    sampler2D _AlphaTex;

    fixed4 SampleSpriteTexture (sampler2D tex, float2 uv)
    {
        fixed4 color = tex2D (tex, uv);

    #if ETC1_EXTERNAL_ALPHA
        fixed4 alpha = tex2D (_AlphaTex, uv);
        color.a = lerp (color.a, alpha.r, _EnableExternalAlpha);
    #endif

        return color;
    }

    fixed4 SpriteFrag(v2f IN) : SV_Target
    {
        fixed4 c = SampleSpriteTexture (_MainTex, IN.texcoord) * IN.color;
        fixed4 g = SampleSpriteTexture (_EmissionMap, IN.texcoord);
        c.rgb += g.rgb * _EmissionColor * g.a;
        c.rgb *= c.a;
        return c;
    }

    #ifdef EMISSION_ONLY
    fixed4 SpriteNoMainFrag(v2f IN) : SV_Target
    {
        fixed4 c = SampleSpriteTexture (_EmissionMap, IN.texcoord);
        c.a = SampleSpriteTexture (_MainTex, IN.texcoord).a * IN.color.a;
        c.rgb *= _EmissionColor;
        c.rgb *= c.a;
        return c;
    }
    #endif

#endif
