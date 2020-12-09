import React from 'react';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const TextEle = ({ variant, style, ...rest }) => {
  const { colors } = useTheme();
  return <Text style={[styles[variant], { color: colors.text }, style]} {...rest} />;
};

TextEle.propTypes = {
  variant: PropTypes.oneOf([
    'header1',
    'header2',
    'title1',
    'title2',
    'subTitle1',
    'subTitle2',
    'body1',
    'body2',
    'caption',
    'buttonText',
    'overlineText',
  ]).isRequired,
  style: Text.propTypes.style,
};

TextEle.defaultProps = {
  style: {},
};

export default TextEle;
