'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Monitor,
  MessageCircle,
  FileText,
  Clock,
  Users,
  AlertCircle
} from 'lucide-react';
import { teleconsultationAPI } from '@/lib/api';
import { toast } from 'sonner';

const TeleconsultationInterface = ({ 
  sessionId, 
  userRole, // 'patient', 'nurse', 'doctor'
  onSessionEnd 
}) => {
  const [sessionData, setSessionData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [participants, setParticipants] = useState([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  // WebRTC Configuration
  const rtcConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  useEffect(() => {
    initializeSession();
    
    return () => {
      cleanupSession();
    };
  }, [sessionId]);

  useEffect(() => {
    if (sessionData?.session_started) {
      const interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [sessionData?.session_started]);

  const initializeSession = async () => {
    try {
      setLoading(true);
      
      // Get session details
      const response = await teleconsultationAPI.getSessionDetails(sessionId);
      setSessionData(response.data.session);
      setParticipants(response.data.session.participants || []);
      
      // Join session based on user role
      await joinSession();
      
      // Initialize WebRTC
      await initializeWebRTC();
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to initialize session:', err);
      setError('Failed to initialize teleconsultation session');
      setLoading(false);
    }
  };

  const joinSession = async () => {
    try {
      let response;
      
      switch (userRole) {
        case 'patient':
          response = await teleconsultationAPI.patientJoinSession(sessionId);
          break;
        case 'doctor':
          response = await teleconsultationAPI.doctorJoinSession(sessionId);
          break;
        case 'nurse':
          // Nurse is typically already in the session as initiator
          break;
      }
      
      if (response) {
        setSessionData(response.data.session);
        setConnectionStatus('connected');
        setIsConnected(true);
      }
    } catch (err) {
      console.error('Failed to join session:', err);
      throw err;
    }
  };

  const initializeWebRTC = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Create peer connection
      const peerConnection = new RTCPeerConnection(rtcConfiguration);
      peerConnectionRef.current = peerConnection;
      
      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
      
      // Handle remote stream
      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };
      
      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        setConnectionStatus(peerConnection.connectionState);
      };
      
    } catch (err) {
      console.error('Failed to initialize WebRTC:', err);
      setError('Failed to access camera/microphone');
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const endSession = async () => {
    try {
      await teleconsultationAPI.endSession(sessionId, {
        treatment_notes: '',
        prescription_needed: false,
        follow_up_required: false
      });
      
      cleanupSession();
      onSessionEnd?.();
      toast.success('Session ended successfully');
    } catch (err) {
      console.error('Failed to end session:', err);
      toast.error('Failed to end session');
    }
  };

  const cleanupSession = () => {
    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Connecting to teleconsultation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-white font-medium">
              Teleconsultation - {sessionData?.session_id}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(sessionDuration)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <Users className="h-4 w-4" />
            <span>{participants.length} participants</span>
          </div>
          
          <button
            onClick={endSession}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors flex items-center space-x-2"
          >
            <PhoneOff className="h-4 w-4" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {/* Video Interface */}
      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          {/* Remote Video */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover bg-gray-800"
          />
          
          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-64 h-48 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {!isVideoEnabled && (
              <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                <VideoOff className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800 bg-opacity-90 px-6 py-3 rounded-full">
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-colors ${
                  isVideoEnabled 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>
              
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full transition-colors ${
                  isAudioEnabled 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              
              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                <Monitor className="h-5 w-5" />
              </button>
              
              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </button>
              
              {userRole === 'doctor' && (
                <button className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  <FileText className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel (Optional) */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <h3 className="text-white font-semibold mb-4">Session Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm">Session Type</label>
              <p className="text-white">{sessionData?.session_type}</p>
            </div>
            
            <div>
              <label className="text-gray-300 text-sm">Participants</label>
              <div className="space-y-2 mt-2">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-sm">{participant.name || participant.role}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {sessionData?.patient_symptoms && (
              <div>
                <label className="text-gray-300 text-sm">Symptoms</label>
                <p className="text-white text-sm">{sessionData.patient_symptoms}</p>
              </div>
            )}
            
            {sessionData?.vital_signs && (
              <div>
                <label className="text-gray-300 text-sm">Vital Signs</label>
                <div className="text-white text-sm space-y-1">
                  {Object.entries(sessionData.vital_signs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key.replace('_', ' ')}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeleconsultationInterface;
