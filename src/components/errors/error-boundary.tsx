import { Component } from "react";
import type { PropsWithChildren } from "react";
import { Button } from "#components/buttons";

interface IProps extends PropsWithChildren<{}> {}

interface IState {
  /**
   * Define a state variable to track whether is an error or not
   */
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Update state so the next render will show the fallback UI.
   */
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  /**
   * You can use your own error logging service here.
   */
  componentDidCatch(error: Error, errorInfo: unknown) {
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </Button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}
