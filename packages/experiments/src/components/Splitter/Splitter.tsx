
import * as React from 'react';
import { ISplitterProps } from './Splitter.types';
import { css, BaseComponent, autobind } from '../../Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { ISplitterClassNames, getSplitterClassNames } from './Splitter.classNames';
import { getStyles } from './Splitter.styles';
import { Label } from '../../../../office-ui-fabric-react/lib/Label';

export interface ISplitterState {
  isDragging?: boolean;
  startX?: number;
  leftPaneWidth: number;
  isCollapsed: boolean;
}

const collapsedWidth = 20;
const defaultInitialWidth = 300;

/**
 * A splitter component that renders 2 panes with a draggable border.
 */
export class Splitter extends BaseComponent<ISplitterProps, ISplitterState> {
  private _classNames: ISplitterClassNames;

  // tslint:disable-next-line:no-any
  constructor(props: ISplitterProps, context: any) {
    super(props, context);

    this.state = {
      leftPaneWidth: this._getInitialWidth(),
      isCollapsed: false,
    };
  }

  public componentDidMount(): void {
    document.addEventListener('mouseup', this._onMouseUp);
    document.addEventListener('mousemove', this._onMouseMove as any);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mouseup', this._onMouseUp);
    document.removeEventListener('mousemove', this._onMouseMove as any);
  }

  public render(): JSX.Element {
    if (React.Children.count(this.props.children) !== 2) {
      return <h1>A SplitterView must contain exactly 2 child elements.</h1>;
    }

    const {
      className,
      fixedPaneClassName,
      mainPaneClassName,
      isVertical,
      collapsedLabel,
      styles: customStyles,
      theme,
    } = this.props;

    const {
      isCollapsed
    } = this.state;

    const styles = getStyles(theme, customStyles);
    this._classNames = getSplitterClassNames(
      styles,
      className,
      fixedPaneClassName,
      mainPaneClassName,
      isCollapsed,
      isVertical);

    const [leftContent, rightContent] = React.Children.toArray(this.props.children);

    const actualWidth = isCollapsed ? collapsedWidth : this.state.leftPaneWidth;

    return (
      <div className={ this._classNames.root }>
        {
          !isCollapsed &&
          <div
            className={ this._classNames.fixedPane }
            key='fixedPane'
            style={ { width: this.state.leftPaneWidth } }
          >
            { leftContent }
          </div>
        }
        <div className={ this._classNames.handleBar } key='handleBar' style={ { left: actualWidth } } onMouseDown={ this._onMouseDown }>
          {
            isCollapsed &&
            collapsedLabel &&
            <Label
              className={ this._classNames.collapsedLabel }
              onClick={ this._toggleCollapse }
            >
              { collapsedLabel }
            </Label>
          }
          <div className='handleBar-hitTarget' key='hit'></div>
        </div>
        <IconButton
          className={ this._classNames.toggleButton }
          iconProps={ { iconName: isCollapsed ? 'ChevronRight' : 'ChevronLeft' } }
          aria-expanded={ !this.state.isCollapsed }
          onClick={ this._toggleCollapse }
          style={ { left: actualWidth - 32 } }
          title='Collapse'
        />
        <div
          className={ this._classNames.mainPane }
          key='mainPane'
          style={ { left: actualWidth } }>
          { rightContent }
        </div>
      </div>
    );
  }

  @autobind
  private _toggleCollapse(): void {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
      leftPaneWidth: this.state.isCollapsed && this.state.leftPaneWidth <= collapsedWidth ? this._getInitialWidth() : this.state.leftPaneWidth,
    });
  }

  @autobind
  private _onMouseDown(event: React.MouseEvent<HTMLDivElement>): void {
    this.setState({
      isDragging: true,
      startX: event.clientX,
      leftPaneWidth: this.state.isCollapsed ? 0 : this.state.leftPaneWidth,
    });
  }

  @autobind
  private _onMouseMove(event: React.MouseEvent<HTMLDocument>): void {
    if (!this.state.isDragging) {
      return;
    }

    const delta = this.state.startX! - event.clientX;
    const width = this.state.leftPaneWidth - delta;

    this.setState({
      startX: event.clientX,
      leftPaneWidth: width,
      isCollapsed: width <= collapsedWidth,
    });
  }

  @autobind
  private _onMouseUp(): void {
    if (!this.state.isDragging) {
      return;
    }

    this.setState({
      isDragging: false,
    });
  }

  private _getInitialWidth(): number {
    return this.props.initialWidth || defaultInitialWidth;
  }
}
