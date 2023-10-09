import * as React from 'react';
import { View, ViewStyle } from 'react-native';

interface SeparatorProps {
  marginVertical: number;
}

const Separator: React.FC<SeparatorProps> = ({ marginVertical }) => (
  <View style={{ marginVertical }} />
);

export default Separator;
