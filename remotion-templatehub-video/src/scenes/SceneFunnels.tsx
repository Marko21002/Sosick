import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const funnelSteps = [
  {
    icon: '👁️',
    title: 'Привлечение',
    desc: 'SEO + реклама',
    color: '#ff6b6b',
  },
  {
    icon: '💎',
    title: 'Интерес',
    desc: 'Квизы',
    color: '#feca57',
  },
  {
    icon: '🤝',
    title: 'Решение',
    desc: 'Триггеры',
    color: '#48dbfb',
  },
  {
    icon: '💰',
    title: 'Продажа',
    desc: 'Upsell',
    color: '#1dd1a1',
  },
];

export const SceneFunnels: React.FC = () => {
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
        background: 'linear-gradient(135deg, #2d3436 0%, #000000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 40,
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

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
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            padding: '8px 20px',
            borderRadius: 30,
            fontSize: 14,
            fontWeight: 600,
            color: 'white',
            marginBottom: 20,
          }}
        >
          Встроенные инструменты
        </div>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: 'white',
            margin: 0,
            marginBottom: 12,
          }}
        >
          Маркетинговые
          <br />
          воронки
        </h2>
      </div>

      {/* Funnel Steps - Vertical */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 1,
          width: '100%',
        }}
      >
        {funnelSteps.map((step, index) => {
          const delay = index * 12;
          const stepSpring = spring({
            frame: frame - 40 - delay,
            fps,
            config: {damping: 200},
          });

          const scale = interpolate(stepSpring, [0, 1], [0.8, 1]);

          return (
            <React.Fragment key={index}>
              <div
                style={{
                  width: '100%',
                  maxWidth: 320,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 20,
                  padding: 24,
                  textAlign: 'center',
                  border: `2px solid ${step.color}`,
                  boxShadow: `0 0 30px ${step.color}30`,
                  transform: `scale(${scale})`,
                  opacity: stepSpring,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                  }}
                >
                  {step.icon}
                </div>
                <div style={{textAlign: 'left'}}>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: step.color,
                      margin: 0,
                      marginBottom: 4,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      color: 'rgba(255,255,255,0.6)',
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
              
              {index < funnelSteps.length - 1 && (
                <div
                  style={{
                    fontSize: 24,
                    color: 'rgba(255,255,255,0.3)',
                    opacity: spring({
                      frame: frame - 45 - delay,
                      fps,
                      config: {damping: 200},
                    }),
                  }}
                >
                  ↓
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Stats */}
      <div
        style={{
          marginTop: 30,
          display: 'flex',
          gap: 30,
          zIndex: 1,
          opacity: spring({
            frame: frame - 90,
            fps,
            config: {damping: 200},
          }),
        }}
      >
        {[
          {value: '+300%', label: 'Конверсия'},
          {value: '-50%', label: 'Время'},
          {value: '10x', label: 'ROI'},
        ].map((stat, i) => (
          <div key={i} style={{textAlign: 'center'}}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
