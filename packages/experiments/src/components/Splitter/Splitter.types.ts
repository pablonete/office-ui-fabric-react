import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IStyle, ITheme } from '../../Styling';

export interface ISplitterProps extends IBaseProps, React.AllHTMLAttributes<HTMLDivElement> {
  /**
   * The initial width of the fixed pane.
   */
  initialWidth?: number;

  /**
   * The caption to display when the fixed pane is collapsed.
   */
  collapsedLabel?: string;

  /**
   * The class name of the fixed pane (left pane by default).
   */
  fixedPaneClassName?: string;

  /**
   * The class name of the main pane (right pane by default).
   */
  mainPaneClassName?: string;

  /**
   * Splits component as top/bottom. Otherwise, it will be left/right.
   */
  isVertical?: boolean;

  /**
   * Custom styling for individual elements.
   */
  styles?: ISplitterStyles;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;
}

export interface ISplitterStyles {
  /**
   * Style for the root element in the default horizontal layout.
   */
  root?: IStyle;

  /**
   * Style for the root element in the vertical split layout.
   */
  rootVertical?: IStyle;

  /**
   * Style for the panes.
   */
  pane?: IStyle;
}