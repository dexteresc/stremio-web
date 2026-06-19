// Copyright (C) 2017-2026 Smart code 203358507

import { useCallback, useMemo } from 'react';
import { useCore } from 'stremio/core';

type Stream = {
    deepLinks?: {
        externalPlayer?: {
            streaming?: string | null,
        },
    },
} | null;

const usePlayOnDevice = (stream: Stream) => {
    const core = useCore();
    const streamingUrl = useMemo(() => {
        return stream?.deepLinks?.externalPlayer?.streaming ?? null;
    }, [stream]);
    const playOnDevice = useCallback((deviceId: string) => {
        if (streamingUrl) {
            core.transport.dispatch({
                action: 'StreamingServer',
                args: {
                    action: 'PlayOnDevice',
                    args: {
                        device: deviceId,
                        source: streamingUrl,
                    }
                }
            });
        }
    }, [streamingUrl]);
    return { streamingUrl, playOnDevice };
};

export default usePlayOnDevice;
