
import * as React from 'react';
import { ISplitterProps } from './Splitter.types';
import { css, BaseComponent, autobind } from '../../Utilities';
// import * as SplitterStylesModule from './Splitter.scss';

// tslint:disable-next-line:no-any
// const SplitterStyles: any = SplitterStylesModule;

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

    const [leftContent, rightContent] = React.Children.toArray(this.props.children);

    const actualWidth = this.state.isCollapsed ? collapsedWidth : this.state.leftPaneWidth;
    const mainClassName = css('splitter', 'horizontal', 'toggle-button-enabled', this.state.isCollapsed && 'collapsed');

    const toggleButtonSpanClassName =
      this.state.isCollapsed
        ? 'icon-toggle-button-horizontal-collapsed icon'
        : 'icon-toggle-button-horizontal-expanded icon';

    return (
      <div className={ css(mainClassName, this.props.className) }>
        <div
          className={ css('leftPane', 'hotkey-section', 'hotkey-section-0', this.props.fixedPaneClassName) }
          key='leftPane'
          style={ { width: this.state.leftPaneWidth } }>
          { leftContent }
        </div>
        <div className='handleBar' key='handleBar' style={ { left: actualWidth } } onMouseDown={ this._onMouseDown }>
          <div className='handlebar-label' key='label' title={ this.props.collapsedLabel } onClick={ this._toggleCollapse }>
            <span className='handlebar-label-text'>{ this.props.collapsedLabel }</span>
          </div>
          <div className='handleBar-hitTarget' key='hit'></div>
        </div>
        <a
          className='toggle-button'
          href='#'
          title='Collapse'
          aria-expanded='true'
          style={ { left: actualWidth - 18 } }
          onClick={ this._toggleCollapse }
        >
          <span className={ toggleButtonSpanClassName } />
        </a>
        <div
          className={ css('rightPane', 'hotkey-section', 'hotkey-section-1', this.props.mainPaneClassName) }
          key='rightPane'
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
