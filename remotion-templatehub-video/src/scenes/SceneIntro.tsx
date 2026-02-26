import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

export const SceneIntro: React.FC<{
  title: string;
  subtitle: string;
}> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: {damping: 200},
  });

  const subtitleOpacity = spring({
    frame: frame - 15,
    fps,
    config: {damping: 200},
  });

  const circleScale = spring({
    frame: frame - 30,
    fps,
    config: {damping: 15, stiffness: 80, mass: 2},
  });

  const bgProgress = interpolate(frame, [0, 90], [0, 100], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(${135 + bgProgress * 0.5}deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      {/* Animated circles */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          transform: `scale(${circleScale})`,
          left: '-10%',
          top: '10%',
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          transform: `scale(${circleScale * 0.8})`,
          right: '-5%',
          bottom: '20%',
        }}
      />

      {/* Logo */}
      <div
        style={{
          width: 100,
          height: 100,
          background: 'white',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 60,
          transform: `scale(${titleScale})`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="8" height="8" rx="2" fill="#667eea"/>
          <rect x="13" y="3" width="8" height="8" rx="2" fill="#764ba2"/>
          <rect x="3" y="13" width="8" height="8" rx="2" fill="#f093fb"/>
          <rect x="13" y="13" width="8" height="8" rx="2" fill="#667eea"/>
        </svg>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: 'white',
          margin: 0,
          marginBottom: 24,
          transform: `scale(${titleScale})`,
          textShadow: '0 4px 30px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 28,
          color: 'rgba(255,255,255,0.9)',
          margin: 0,
          opacity: subtitleOpacity,
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>

      {/* Animated line */}
      <div
        style={{
          width: interpolate(frame, [50, 80], [0, 150], {extrapolateRight: 'clamp'}),
          height: 4,
          background: 'white',
          marginTop: 60,
          borderRadius: 2,
          opacity: subtitleOpacity,
        }}
      />
    </div>
  );
};
