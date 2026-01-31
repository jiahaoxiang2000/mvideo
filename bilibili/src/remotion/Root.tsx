import { Composition, Folder } from "remotion";
import { compositionRegistry } from "./composition-registry";

export const RemotionRoot: React.FC = () => {
  const baseCompositions = compositionRegistry.filter(
    (composition) => composition.folder === "Base",
  );
  const rootCompositions = compositionRegistry.filter(
    (composition) => !composition.folder,
  );

  return (
    <>
      {baseCompositions.length ? (
        <Folder name="Base">
          {baseCompositions.map((composition) => (
            <Composition
              key={composition.id}
              id={composition.id}
              component={composition.component}
              durationInFrames={composition.durationInFrames}
              fps={composition.fps}
              width={composition.width}
              height={composition.height}
              defaultProps={composition.defaultProps}
            />
          ))}
        </Folder>
      ) : null}
      {rootCompositions.map((composition) => (
        <Composition
          key={composition.id}
          id={composition.id}
          component={composition.component}
          durationInFrames={composition.durationInFrames}
          fps={composition.fps}
          width={composition.width}
          height={composition.height}
          defaultProps={composition.defaultProps}
        />
      ))}
    </>
  );
};
