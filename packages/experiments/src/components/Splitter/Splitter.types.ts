import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';

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
}
