import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const stats = [
  { value: '1000+', label: 'Шаблонов', suffix: '' },
  { value: '50K+', label: 'Пользователей', suffix: '' },
  { value: '99', label: 'Довольных клиентов', suffix: '%' },
];

export const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Background animation
  const bgRotate = interpolate(frame, [0, 100], [0, 10], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(225deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)',
        transform: `rotate(${bgRotate}deg) scale(1.2)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          transform: `rotate(${-bgRotate}deg)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Header */}
        <h2
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#1a1a2e',
            margin: 0,
            marginBottom: 60,
            textAlign: 'center',
          }}
        >
          TemplateHub в цифрах
        </h2>

        {/* Stats Grid */}
        <div
          style={{
            display: 'flex',
            gap: 80,
            justifyContent: 'center',
          }}
        >
          {stats.map((stat, index) => {
            const delay = index * 15;
            const statSpring = spring({
              frame: frame - 20 - delay,
              fps,
              config: {damping: 100, stiffness: 100},
            });

            const scale = interpolate(statSpring, [0, 1], [0.5, 1]);

            // Animate the number counting up
            const countProgress = interpolate(frame, [30 + delay, 70 + delay], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  transform: `scale(${scale})`,
                  opacity: statSpring,
                }}
              >
                <div
                  style={{
                    fontSize: 80,
                    fontWeight: 900,
                    color: '#1a1a2e',
                    marginBottom: 16,
                    textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: 'rgba(26,26,46,0.8)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div
          style={{
            marginTop: 80,
            display: 'flex',
            gap: 40,
            opacity: spring({
              frame: frame - 60,
              fps,
              config: {damping: 200},
            }),
          }}
        >
          {['⭐⭐⭐⭐⭐', 'Надёжно', 'Быстро', 'Просто'].map((badge, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.9)',
                padding: '12px 24px',
                borderRadius: 30,
                fontSize: 18,
                fontWeight: 600,
                color: '#1a1a2e',
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
