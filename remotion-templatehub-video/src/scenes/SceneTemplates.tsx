import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate, staticFile} from 'remotion';
import {Img} from 'remotion';

const templates = [
  {
    image: staticFile('images/template-1.jpg'),
    title: 'Sosick Templates',
    category: 'Платформа',
    desc: '8+ готовых лендингов',
  },
  {
    image: staticFile('images/template-2.jpg'),
    title: 'Dr. Weber',
    category: 'Медицина',
    desc: 'Стоматология',
  },
  {
    image: staticFile('images/template-3.jpg'),
    title: 'LoveCode',
    category: 'Образование',
    desc: 'Курс по знакомствам',
  },
];

export const SceneTemplates: React.FC = () => {
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
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 40,
          opacity: headerSpring,
          transform: `translateY(${(1 - headerSpring) * 30}px)`,
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: 'white',
            margin: 0,
            marginBottom: 12,
          }}
        >
          Готовые шаблоны
        </h2>
        <p
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
          }}
        >
          Для любого бизнеса
        </p>
      </div>

      {/* Templates - Vertical Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          width: '100%',
        }}
      >
        {templates.map((template, index) => {
          const delay = index * 15;
          const cardSpring = spring({
            frame: frame - 40 - delay,
            fps,
            config: {damping: 200},
          });

          const yOffset = interpolate(cardSpring, [0, 1], [80, 0]);

          return (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                transform: `translateY(${yOffset}px)`,
                opacity: cardSpring,
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                display: 'flex',
                height: 140,
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Img
                  src={template.image}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Content */}
              <div style={{padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    padding: '4px 12px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: 8,
                    alignSelf: 'flex-start',
                  }}
                >
                  {template.category}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'white',
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  {template.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.6)',
                    margin: 0,
                  }}
                >
                  {template.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features badges - Vertical scroll style */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          marginTop: 30,
          justifyContent: 'center',
          opacity: spring({
            frame: frame - 90,
            fps,
            config: {damping: 200},
          }),
        }}
      >
        {['Адаптивный', 'Lead-gen', 'Мультиязычность', 'Квизы'].map((badge, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '10px 18px',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 500,
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            ✓ {badge}
          </div>
        ))}
      </div>
    </div>
  );
};
