import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Path from './ReactMinimalPieChartPath';
import { Animated, Text, View } from 'react-native';
import DefaultLabel from './ReactMinimalPieChartLabel';
import { dataPropType, stylePropType } from './propTypes';
import Svg , { G }  from 'react-native-svg';
import {
  degreesToRadians,
  evaluateViewBoxSize,
  evaluateLabelTextAnchor,
  extractPercentage,
  valueBetween,
} from './utils';

const VIEWBOX_SIZE = 100;
const VIEWBOX_HALF_SIZE = VIEWBOX_SIZE / 2;
//const AnimatedSlice = Animated.createAnimatedComponent(Path);
function sumValues(data) {
  return data.reduce((acc, dataEntry) => acc + dataEntry.value, 0);
}

// Append "percentage", "degrees" and "startOffset" into each data entry
function extendData({
  data,
  lengthAngle: totalAngle,
  totalValue,
  paddingAngle,
}) {
  const total = totalValue || sumValues(data);
  const normalizedTotalAngle = valueBetween(totalAngle, -360, 360);
  const numberOfPaddings =
    Math.abs(normalizedTotalAngle) === 360 ? data.length : data.length - 1;
  const degreesTakenByPadding =
    Math.abs(paddingAngle) * numberOfPaddings * Math.sign(normalizedTotalAngle);
  const singlePaddingDegrees = degreesTakenByPadding / numberOfPaddings;
  const degreesTakenByPaths = normalizedTotalAngle - degreesTakenByPadding;
  let lastSegmentEnd = 0;

  return data.map(dataEntry => {
    const valueInPercentage = (dataEntry.value / total) * 100;
    const degrees = extractPercentage(degreesTakenByPaths, valueInPercentage);
    const startOffset = lastSegmentEnd;
    lastSegmentEnd = lastSegmentEnd + degrees + singlePaddingDegrees;

    return {
      percentage: valueInPercentage,
      degrees,
      startOffset,
      ...dataEntry,
    };
  });
}

function makeSegmentTransitionStyle(duration, easing, furtherStyles = {}) {
  // Merge CSS transition necessary for chart animation with the ones provided by "segmentsStyle"
  const transition = [
    `stroke-dashoffset ${duration}ms ${easing}`,
    furtherStyles.transition,
  ]
    .filter(Boolean)
    .join(',');

    console.log('transaction is :',transition);
  return {
    transition,
  };
}

function renderLabelItem(option, props, value, category) {
  if (React.isValidElement(option)) {
    return React.cloneElement(option, props);
  }

  let label = value;
  if (typeof option === 'function') {
    label = option(props);
    if (React.isValidElement(label)) {
      return label;
    }
  }

  return (<DefaultLabel {...props}>{category} </DefaultLabel>);
}

function renderLabels(data, props) {
  const labelPosition = extractPercentage(props.radius, props.labelPosition);

  return data.map((dataEntry, index) => {
    const startAngle = props.startAngle + dataEntry.startOffset;
    const halfAngle = startAngle + dataEntry.degrees / 2;
    const halfAngleRadians = degreesToRadians(halfAngle);
    const dx = Math.cos(halfAngleRadians) * labelPosition;
    const dy = Math.sin(halfAngleRadians) * labelPosition;

    // This object is passed as props to the "label" component
    const labelProps = {
      key: `label-${dataEntry.key || index}`,
      x: props.cx,
      y: props.cy,
      dx,
      dy,
      textAnchor: evaluateLabelTextAnchor({
        lineWidth: props.lineWidth,
        labelPosition: props.labelPosition,
        labelHorizontalShift: dx,
      }),
      data: data,
      dataIndex: index,
      color: dataEntry.color,
      style: props.labelStyle,
    };

    return renderLabelItem(props.label, labelProps, dataEntry.value, dataEntry.category);
  });
}

function onPieClick(props, category) {
    console.log("hiiiiiiiiiii",JSON.stringify(category));
    props.navigation.navigate('CategoryListScreen', { category });
  };

function renderSegments(data, props, hide) {
  let style = props.segmentsStyle;
  let reveal;

  if (props.animate) {
    const transitionStyle = makeSegmentTransitionStyle(
      props.animationDuration,
      props.animationEasing,
      style
    );
    style = Object.assign({}, style, transitionStyle);
    console.log("inside animate true",style);
  }

  // Hide/reveal the segment?
  if (hide === true) {
    reveal = 0;
  } else if (typeof props.reveal === 'number') {
    reveal = props.reveal;
  } else if (hide === false) {
    reveal = 100;
  }

  const paths = data.map((dataEntry, index) => {
    const startAngle = props.startAngle + dataEntry.startOffset;

    return (
      <Path
        key={dataEntry.key || index}
        cx={props.cx}
        cy={props.cy}
        startAngle={startAngle}
        lengthAngle={dataEntry.degrees}
        radius={props.radius}
        lineWidth={extractPercentage(props.radius, props.lineWidth)}
        reveal={reveal}
        title={dataEntry.title}
        style={Object.assign({}, style, dataEntry.style)}
        stroke={dataEntry.color}
        strokeLinecap={props.rounded ? 'round' : undefined}
        fill="none"
        onMouseOver={
          props.onMouseOver && (e => props.onMouseOver(e, props.data, index))
        }
        onMouseOut={
          props.onMouseOut && (e => props.onMouseOut(e, props.data, index))
        }
        onPress={() => onPieClick(props, dataEntry.category)}
      />
    );
  });

  if (props.background) {
    paths.unshift(
      <Path
        key="bg"
        cx={props.cx}
        cy={props.cy}
        startAngle={props.startAngle}
        lengthAngle={props.lengthAngle}
        radius={props.radius}
        lineWidth={extractPercentage(props.radius, props.lineWidth)}
        stroke={props.background}
        strokeLinecap={props.rounded ? 'round' : undefined}
        fill="none"
      />
    );
  }

  return paths;
}

export default class ReactMinimalPieChart extends Component {
  constructor(props) {
//  this.state = {
//              animValue: new Animated.Value(0.1),
//          };
    super(props);


    if (this.props.animate === true) {
      this.hideSegments = true;
       console.log('animate is');
    }
//    this.state = {
//                  animValue: new Animated.Value(0.1),
//              };
//
//
//
//      animate = ()=>{
//
//              Animated.timing(
//                  this.state.animValue,
//                  {
//                      toValue: 2,
//                      duration: 500,
//                      easing: Easing.inOut(Easing.quad)
//                  }
//              ).start(()=>{
//                  setTimeout(this.resetPie, 2000);
//              });
//          };
//          resetPie = ()=>{
//                  this.state.animValue.setValue(0.1);
//              };

  }




  componentDidMount() {
    this.animate;
  }

  componentWillUnmount() {
    if (this.initialAnimationTimerId) {
      clearTimeout(this.initialAnimationTimerId);
    }
    if (this.initialAnimationRAFId) {
      cancelAnimationFrame(this.initialAnimationRAFId);
    }
  }

  startAnimation() {
    this.hideSegments = false;
    console.log('hiiii',this.forceUpdate());
  }

  render() {
    if (this.props.data === undefined) {
      return null;
    }
    const extendedData = extendData(this.props);

    return (
        <View>
        <Svg
          viewBox={evaluateViewBoxSize(this.props.ratio, VIEWBOX_SIZE)}
          width="80%"
          height="80%"

        >
          {renderSegments(extendedData, this.props, this.hideSegments)}
          {this.props.label && renderLabels(extendedData, this.props)}
          {this.props.injectSvg && this.props.injectSvg()}

        </Svg>
        {this.props.children}
      </View>
    );
  }
}

ReactMinimalPieChart.displayName = 'ReactMinimalPieChart';

ReactMinimalPieChart.propTypes = {
  data: dataPropType,
  cx: PropTypes.number,
  cy: PropTypes.number,
  ratio: PropTypes.number,
  totalValue: PropTypes.number,
  className: PropTypes.string,
  style: stylePropType,
  segmentsStyle: stylePropType,
  background: PropTypes.string,
  startAngle: PropTypes.number,
  lengthAngle: PropTypes.number,
  paddingAngle: PropTypes.number,
  lineWidth: PropTypes.number,
  radius: PropTypes.number,
  rounded: PropTypes.bool,
  animate: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  reveal: PropTypes.number,
  children: PropTypes.node,
  injectSvg: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool,
  ]),
  labelPosition: PropTypes.number,
  labelStyle: stylePropType,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onClick: PropTypes.func,
};

ReactMinimalPieChart.defaultProps = {
  cx: 50,
  cy: 30,
  ratio: 2.5,
  startAngle: 0,
  lengthAngle: 360,
  paddingAngle: 1,
  lineWidth: 100,
  radius: 40,
  rounded: false,
  animate: false,
  animationDuration: 2000,
  animationEasing: 'ease-out',
  label: false,
  labelPosition: 50,
  onMouseOver: undefined,
  onMouseOut: undefined,
  onClick: undefined,
  flex:0.5
};
