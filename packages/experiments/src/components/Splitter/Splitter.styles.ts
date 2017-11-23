import { ISplitterStyles } from './Splitter.types';
import {
  ITheme,
  concatStyleSets,
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

const leftWidthTransition = {
  transition: 'left 0.3s, width 0.3s'
};

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

    pane: {
      ...leftWidthTransition,
      position: 'absolute',
      overflow: 'hidden',
    },

    handleBar: {
      ...leftWidthTransition,
      position: 'absolute',
      background: 'red',  // TODO Use theme color
      cursor: 'e-resize',
    },

    handleBarHorizontal: {
      top: 0,
      bottom: 0,
      width: '1px',
      borderRight: '3px transparent solid',
    },

    handleBarVertical: {
      left: 0,
      right: 0,
      height: '1px',
    },

    collapsedLabel: {
      position: 'absolute',
      transform: 'rotate(90deg)',
    },

    toggleButton: {
      ...leftWidthTransition,
      position: 'absolute', // TODO This is overriden by button own style. Why?
      // TODO change icon font-size to 10px
    },
  };

  return concatStyleSets(styles, customStyles)!;
});
