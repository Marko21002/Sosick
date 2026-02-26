import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const aiFeatures = [
  {
    icon: '🎯',
    title: 'Анализ бизнеса',
    desc: 'AI изучает вашу нишу',
  },
  {
    icon: '✨',
    title: 'Подбор шаблона',
    desc: 'Автоматический выбор',
  },
  {
    icon: '📝',
    title: 'Генерация текста',
    desc: 'Уникальный контент',
  },
  {
    icon: '🎨',
    title: 'Адаптация стиля',
    desc: 'Цвета под бренд',
  },
];

export const SceneAI: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 10,
    fps,
    config: {damping: 200},
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 40,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background particles */}
      {[...Array(15)].map((_, i) => {
        const particleDelay = i * 5;
        const particleSpring = spring({
          frame: frame - particleDelay,
          fps,
          config: {damping: 100},
        });
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 4 + (i % 4) * 2,
              height: 4 + (i % 4) * 2,
              background: 'rgba(102, 126, 234, 0.3)',
              borderRadius: '50%',
              left: `${10 + (i * 6) % 80}%`,
              top: `${10 + (i * 8) % 80}%`,
              transform: `scale(${particleSpring})`,
              opacity: 0.3 + (i % 5) * 0.1,
            }}
          />
        );
      })}

      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 40,
          opacity: headerSpring,
          transform: `translateY(${(1 - headerSpring) * 30}px)`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(102, 126, 234, 0.2)',
            padding: '10px 24px',
            borderRadius: 30,
            fontSize: 14,
            fontWeight: 600,
            color: '#667eea',
            marginBottom: 20,
            border: '1px solid rgba(102, 126, 234, 0.3)',
          }}
        >
          <span style={{fontSize: 18}}>🤖</span>
          AI-технологии
        </div>
        
        <h2
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: 'white',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Умный подбор
          <br />
          контента
        </h2>
      </div>

      {/* AI Features - Vertical Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          width: '100%',
          maxWidth: 400,
          zIndex: 1,
        }}
      >
        {aiFeatures.map((feature, index) => {
          const delay = index * 10;
          const featureSpring = spring({
            frame: frame - 40 - delay,
            fps,
            config: {damping: 200},
          });

          const yOffset = interpolate(featureSpring, [0, 1], [50, 0]);

          return (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                padding: 24,
                border: '1px solid rgba(255,255,255,0.1)',
                transform: `translateY(${yOffset}px)`,
                opacity: featureSpring,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </div>
              
              <div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'white',
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.6)',
                    margin: 0,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          marginTop: 30,
          padding: '16px 24px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
          borderRadius: 16,
          border: '1px solid rgba(102, 126, 234, 0.3)',
          zIndex: 1,
          opacity: spring({
            frame: frame - 80,
            fps,
            config: {damping: 200},
          }),
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: 'white',
            margin: 0,
            textAlign: 'center',
          }}
        >
          💡 Просто расскажите о бизнесе — AI сделает всё остальное
        </p>
      </div>
    </div>
  );
};
