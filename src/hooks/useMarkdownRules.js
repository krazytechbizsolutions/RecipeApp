import TextEle from '@components/TextEle';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { getUniqueID, hasParents } from 'react-native-markdown-renderer';

const useMarkdownRules = () => {
    const {colors} = useTheme();
    return {
  heading1: (node, children, parent, styles) => (
    <TextEle key={getUniqueID()} variant="h1">
      [{children}]
    </TextEle>
  ),
  heading2: (node, children, parent, styles) => (
    <TextEle key={getUniqueID()} variant="h2">
      [{children}]
    </TextEle>
  ),
  heading3: (node, children, parent, styles) => (
    <TextEle key={getUniqueID()} variant="h3">
      [{children}]
    </TextEle>
  ),
  text: (node, children, parent, styles) => (
    <TextEle key={getUniqueID()} variant="p1">
      {node.content}
    </TextEle>
  ),
  list_item: (node, children, parent, styles) => {
    if (hasParents(parent, 'bullet_list')) {
      return (
        <View key={node.key} style={styles.listUnorderedItem}>
          <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor:colors.primary }}></View>
          <View style={[styles.listItem]}>{children}</View>
        </View>
      );
    }

    if (hasParents(parent, 'ordered_list')) {
      return (
        <View key={node.key} style={styles.listOrderedItem}>
          <TextEle variant="p1">{node.index + 1}{node.markup}</TextEle>
          <View style={[styles.listItem]}>{children}</View>
        </View>
      );
    }

    return (
      <View key={node.key} style={[styles.listItem]}>
        {children}
      </View>
    );
  },
}};

export default useMarkdownRules;
