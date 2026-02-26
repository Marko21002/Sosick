import React from 'react';
import {TransitionSeries, linearTiming, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {SceneIntro} from './scenes/SceneIntro';
import {SceneTemplates} from './scenes/SceneTemplates';
import {SceneFunnels} from './scenes/SceneFunnels';
import {SceneAI} from './scenes/SceneAI';
import {SceneCTA} from './scenes/SceneCTA';

export const TemplateHubVideo: React.FC<{
  title?: string;
  subtitle?: string;
}> = ({title = "Sosick Templates", subtitle = "Готовые решения для вашего бизнеса"}) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Intro */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneIntro title={title} subtitle={subtitle} />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition 
        presentation={fade()} 
        timing={linearTiming({durationInFrames: 15})} 
      />
      
      {/* Scene 2: Website Templates Showcase */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <SceneTemplates />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition 
        presentation={wipe({direction: 'from-right'})} 
        timing={linearTiming({durationInFrames: 20})} 
      />
      
      {/* Scene 3: Marketing Funnels */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneFunnels />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition 
        presentation={slide({direction: 'from-bottom'})} 
        timing={springTiming({config: {damping: 200}})} 
      />
      
      {/* Scene 4: AI Content Matching */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneAI />
      </TransitionSeries.Sequence>
      
      <TransitionSeries.Transition 
        presentation={fade()} 
        timing={linearTiming({durationInFrames: 15})} 
      />
      
      {/* Scene 5: Call to Action */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneCTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
