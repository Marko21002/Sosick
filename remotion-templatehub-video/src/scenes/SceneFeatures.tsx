import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const features = [
  {
    icon: '🎨',
    title: 'Готовые шаблоны',
    desc: 'Более 1000+ профессиональных дизайнов',
  },
  {
    icon: '⚡',
    title: 'Быстрый старт',
    desc: 'Запустите проект за минуты, не недели',
  },
  {
    icon: '🎯',
    title: 'Для любых задач',
    desc: 'Сайты, презентации, документы, соцсети',
  },
  {
    icon: '🔧',
    title: 'Легкая кастомизация',
    desc: 'Изменяйте цвета, шрифты, контент',
  },
];

export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Header animation
  const headerY = spring({
    frame: frame - 10,
    fps,
    config: {damping: 200},
  });

  const headerOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 80,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          transform: `translateY(${(1 - headerY) * 30}px)`,
          opacity: headerOpacity,
          marginBottom: 60,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'white',
            margin: 0,
            marginBottom: 16,
          }}
        >
          Возможности TemplateHub
        </h2>
        <p
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
          }}
        >
          Всё, что нужно для успешного проекта
        </p>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40,
          maxWidth: 1200,
          width: '100%',
        }}
      >
        {features.map((feature, index) => {
          const delay = index * 10;
          const cardSpring = spring({
            frame: frame - 40 - delay,
            fps,
            config: {damping: 200},
          });

          const cardY = interpolate(cardSpring, [0, 1], [50, 0]);

          return (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                padding: 40,
                border: '1px solid rgba(255,255,255,0.1)',
                transform: `translateY(${cardY}px)`,
                opacity: cardSpring,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: 'white',
                  margin: 0,
                  marginBottom: 12,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 20,
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
