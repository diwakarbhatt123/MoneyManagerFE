import React from 'react';
import PropTypes from 'prop-types';
import { dataPropType } from './propTypes';
import { Text } from 'react-native-svg'

export default function ReactMinimalPieChartLabel({
  data,
  dataIndex,
  color,
  ...props
}) {
  return (
    <Text
      textAnchor="middle"
      alignmentBaseline="middle"
      fill={'#121212'}

      {...props}
    />
  );
}

ReactMinimalPieChartLabel.displayName = 'ReactMinimalPieChartLabel';

ReactMinimalPieChartLabel.propTypes = {
  data: dataPropType,
  dataIndex: PropTypes.number,
  color: PropTypes.string,
};
