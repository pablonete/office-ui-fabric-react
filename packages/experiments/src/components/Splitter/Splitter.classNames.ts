import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { ISplitterStyles } from './Splitter.types';

export interface ISplitterClassNames {
  root?: string;
  fixedPane?: string;
  mainPane?: string;
  handleBar?: string;
  collapsedLabel?: string;
  toggleButton?: string;
}

export const getSplitterClassNames = memoizeFunction((
  styles: ISplitterStyles,
  className: string | undefined,
  fixedPaneClassName: string | undefined,
  mainPaneClassName: string | undefined,
  isCollapsed: boolean,
  isVertical: boolean | undefined,
): ISplitterClassNames => {
  return {
    root: mergeStyles(
      className,
      'ms-Splitter',
      styles.root,
      isVertical
        ? 'vertical'
        : 'horizontal',
      isCollapsed && 'collapsed',
    ),
    fixedPane: mergeStyles(
      'fixedPane',
      fixedPaneClassName,
      styles.pane,
    ),
    mainPane: mergeStyles(
      'mainPane',
      mainPaneClassName,
      styles.pane,
    ),
    handleBar: mergeStyles(
      'handleBar',
      styles.handleBar,
      isVertical
        ? styles.handleBarVertical
        : styles.handleBarHorizontal,
    ),
    collapsedLabel: mergeStyles(
      styles.collapsedLabel,
    ),
    toggleButton: mergeStyles(
      'toggle-button',
      styles.toggleButton,
    ),
  };
});