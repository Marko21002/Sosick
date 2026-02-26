import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: {damping: 200},
  });

  const subtitleSpring = spring({
    frame: frame - 25,
    fps,
    config: {damping: 200},
  });

  const buttonSpring = spring({
    frame: frame - 40,
    fps,
    config: {damping: 15, stiffness: 200},
  });

  const featuresSpring = spring({
    frame: frame - 55,
    fps,
    config: {damping: 200},
  });

  const pulseScale = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.05, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Main content */}
      <div style={{textAlign: 'center', zIndex: 1, width: '100%'}}>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            margin: 0,
            marginBottom: 20,
            transform: `translateY(${(1 - titleSpring) * 40}px)`,
            opacity: titleSpring,
            lineHeight: 1.2,
          }}
        >
          Готовы
          <br />
          к запуску?
        </h2>

        <p
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
            marginBottom: 40,
            transform: `translateY(${(1 - subtitleSpring) * 30}px)`,
            opacity: subtitleSpring,
            lineHeight: 1.4,
          }}
        >
          Лендинг с AI-контентом
          <br />
          за 24 часа
        </p>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${buttonSpring * pulseScale})`,
            opacity: buttonSpring,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: 'white',
              color: '#667eea',
              padding: '22px 50px',
              borderRadius: 50,
              fontSize: 22,
              fontWeight: 700,
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              cursor: 'pointer',
            }}
          >
            Начать бесплатно →
          </div>
        </div>

        {/* Features list - Vertical */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            opacity: featuresSpring,
            transform: `translateY(${(1 - featuresSpring) * 20}px)`,
            alignItems: 'center',
          }}
        >
          {['✓ Бесплатный аудит', '✓ AI-генерация контента', '✓ Запуск за 24ч'].map((item, i) => (
            <div
              key={i}
              style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 500,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Website URL */}
        <div
          style={{
            marginTop: 50,
            fontSize: 20,
            color: 'rgba(255,255,255,0.7)',
            opacity: spring({
              frame: frame - 70,
              fps,
              config: {damping: 200},
            }),
          }}
        >
          sosicktemplates.com
        </div>
      </div>
    </div>
  );
};
