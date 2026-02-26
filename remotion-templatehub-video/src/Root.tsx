import {Composition} from 'remotion';
import {TemplateHubVideo} from './TemplateHubVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="TemplateHubPromo"
      component={TemplateHubVideo}
      durationInFrames={600}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        title: "Sosick Templates",
        subtitle: "Готовые решения для вашего бизнеса",
      }}
    />
  );
};
