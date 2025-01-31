import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DividerLine } from "../dividerline/dividerLine";
import { NotRegistration } from "../unregistered/noRegistration";
export const ModalComponente = ({
  modalVisible,
  handleCloseModal,
  transparent = true,
  animationType = "slide",
  children,
  modalStyle = {},
  canCloseModal = true,
  title = "",
  childrenStatic = "",
  bottomStatic = "",
  linearDiviider = false,
  renderItem,
  data,
  keyExtractor
}) => {

  const isList = Array.isArray(data);
  return (
    <Modal
      animationType={animationType} // fade none slide
      transparent={transparent} // true o false
      visible={modalVisible}
      onRequestClose={() => {
        if (canCloseModal) {
          handleCloseModal();
        }
      }}
    >
      <View
        style={[
          {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          modalStyle.overlay,
        ]}
      >
        <View
          style={[
            {
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 16,
              width: "100%",
            },
            modalStyle.content,
            {
              height: modalStyle.height,
            },
          ]}
        >
          <View
            style={{
              alignSelf: "center",
              width: 40,
              height: 5,
              backgroundColor: "black",
              borderRadius: 3,
              marginBottom: 10,
            }}
          />
          <View style={{ flexDirection: "row-reverse", marginBottom: 12 }}>
            {canCloseModal && (
              <TouchableOpacity onPress={handleCloseModal}>
                <MaterialIcons name="close" size={30} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{
              paddingLeft: 8,
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
              paddingBottom: 10,
            }}
          >
            {title}
          </Text>
          <View>{childrenStatic}</View>
          {linearDiviider ? <DividerLine /> : null}

          {isList ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor || ((item, index) => item.id || index.toString())}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={<NotRegistration/>}
            />
          ) : (
            <ScrollView
              style={{
                height: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                }}
              >
                {children}
              </View>
            </ScrollView>
          )}
          {linearDiviider ? <DividerLine /> : null}
          <View>{bottomStatic}</View>
        </View>
      </View>
    </Modal>
  );
};