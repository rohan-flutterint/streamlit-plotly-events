import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import Plot from 'react-plotly.js';

interface State {
  numClicks: number
  isFocused: boolean
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class StreamlitPlotlyEventsComponent extends StreamlitComponentBase<State> {
  public render = (): ReactNode => {
    const plot_obj = JSON.parse(this.props.args["plot_obj"])

    return (
      <Plot
        className="stPlotlyChart"
        data={plot_obj.data}
        layout={plot_obj.layout}
        onClick={this.onClicked}
      />
    )
  }

  /** Click handler for plot. */
  private onClicked = (data: any) => {
    console.log(data)
    var clickedPoints: Array<any> = [];
    data.points.forEach(function (arrayItem: any) {
      clickedPoints.push({
        x: arrayItem.x,
        y: arrayItem.y,
        curveNumber: arrayItem.curveNumber,
        pointNumber: arrayItem.pointNumber,
        pointIndex: arrayItem.pointIndex
      })
    });

    Streamlit.setComponentValue(JSON.stringify(clickedPoints))
  }
}

export default withStreamlitConnection(StreamlitPlotlyEventsComponent)
