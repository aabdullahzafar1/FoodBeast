import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AppText from "../AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {MaterialCommunityIcons} from "@expo/vector-icons"

import colors from "../../config/colors";


function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  renderLeftActions,
  style,
  badge=false,
  count = 0,
  imageStyle,
  chevron,
  settingIcon,
  onSettingPress
}) {
  return (
    <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions} friction={2}  >
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image style={[styles.image,imageStyle]}source= {{uri: image}} />}
          <View style={[styles.detailsContainer]}>
            <AppText style={styles.title} numberOfLines ={1}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle} numberOfLines ={2}>{subTitle}</AppText>}
          </View>
          {count>0 && <AppText>In Cart: {count}</AppText>}
          {chevron && <MaterialCommunityIcons color={colors.medium} name = "chevron-right" size= {25}></MaterialCommunityIcons>}
          {settingIcon && <MaterialCommunityIcons onPress={onSettingPress} color={colors.primary} name = "lead-pencil" size= {25}></MaterialCommunityIcons>}
          {badge &&
          <View style={{backgroundColor: colors.primary, alignItems: "center", }}>
            <AppText style={{color:colors.white}}>5</AppText>
          <MaterialCommunityIcons color={colors.light} name = "cart-outline" size= {25}></MaterialCommunityIcons>
          </View>
          }
          
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
