import { ISplitterStyles } from './Splitter.types';
import {
  ITheme,
  concatStyleSets,
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

/**
 * Gets the splitter styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
export const getStyles = memoizeFunction((
  theme: ITheme | undefined,
  customStyles?: ISplitterStyles,
): ISplitterStyles => {
  const styles: ISplitterStyles = {
    root: {
      position: 'relative',
    },

    rootVertical: {
    },

    pane: {
      position: 'absolute',
      overflow: 'hidden',
      transition: 'left 0.3s, width 0.3s'
    },
  };

  return concatStyleSets(styles, customStyles)!;
});
