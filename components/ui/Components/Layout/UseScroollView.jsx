import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { refreshControl } from "../../../../src/utils/functiones/refresh";

export default function LayoutScroolView({
  children,
  onRefreshExternal,
  ...props
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      if (typeof onRefreshExternal === "function") {
        await onRefreshExternal();
      } 
      setRefreshing(false);
    } catch {
      setRefreshing(false);
    }
  }, [onRefreshExternal]);

  return (
    <View style={{backgroundColor:"transparent"}}>
      <ScrollView
      style={{
        backgroundColor:"transparent"
      }}
      refreshControl={refreshControl(refreshing, onRefresh)}>
        {children}
      </ScrollView>
    </View>
  );
}
