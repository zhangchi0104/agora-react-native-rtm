import React, { ReactElement } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Config from '../config/agora.config';

import BaseRenderLogin from './BaseRenderLogin';
import { AgoraDivider, AgoraStyle, AgoraText, AgoraView } from './ui';

interface Props {
  name: string;
  renderConfiguration?: () => ReactElement | undefined;
  renderChannel?: () => ReactElement | undefined;
  renderUsers?: () => ReactElement | undefined;
  renderAction?: () => ReactElement | undefined;
}

export function BaseComponent({
  name,
  renderConfiguration,
  renderChannel,
  renderUsers,
  renderAction,
}: Props) {
  const users = renderUsers ? renderUsers() : undefined;
  const configuration = renderConfiguration ? renderConfiguration() : undefined;
  return (
    <KeyboardAvoidingView
      style={AgoraStyle.fullSize}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AgoraView style={AgoraStyle.fullWidth}>
        {/* {renderChannel ? renderChannel() : <BaseRenderLogin uid={Config.uid} />} */}
      </AgoraView>
      {users ? (
        <AgoraView style={AgoraStyle.fullSize}>{users}</AgoraView>
      ) : undefined}
      {configuration ? (
        <>
          <AgoraDivider />
          <AgoraText style={styles.title}>
            {`The Configuration of ${name}`}
          </AgoraText>
          <AgoraDivider />
          <ScrollView style={AgoraStyle.fullSize}>{configuration}</ScrollView>
        </>
      ) : undefined}
      <AgoraView style={AgoraStyle.float}>
        {renderAction ? renderAction() : undefined}
      </AgoraView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
