"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Confetti from "react-confetti";

export default function ValentineRequest() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: "60%", left: "60%" });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioStarted, setAudioStarted] = useState(false);
  
  const funFacts = [
    "We've dated for 3 years, and you're still saying no? 😢",
    "You're not gonna say yes even though you liked me since we were 12? 😳",
    "You said yes to me when he was uglier in the army, but no when I look better now? 😆",
    "We've known each other for over a decade, and you're still making me work for it? 😂",
    "PLEASE say yes 💖", 
    "ok enough just say yes bel"
  ];

  useEffect(() => {
    const music = new Audio("/Blue-Yung-Kai.mp3");
    music.loop = true;
    music.volume = 0.5;
    setAudio(music);
    return () => {
      music.pause();
      music.currentTime = 0;
    };
  }, []);

  const startMusic = () => {
    if (audio && !audioStarted) {
      audio.play().catch(error => console.error("Audio playback error:", error));
      setAudioStarted(true);
    }
  };

  const handleNoClick = () => {
    startMusic();
    setNoCount(noCount + 1);
    const newTop = Math.random() * 60 + 20 + "%";
    const newLeft = Math.random() * 60 + 20 + "%";
    const newSize = Math.max(0.2, noButtonSize - 0.1);
    setNoButtonPosition({ top: newTop, left: newLeft });
    setNoButtonSize(newSize);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200" onClick={startMusic}>
      {!accepted ? (
        <Card className="p-6 bg-white shadow-lg rounded-2xl text-center">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4 text-red-500">Will you be my Valentine? ❤️</h1>
            <p className="mb-4 text-lg text-gray-700">{funFacts[noCount % funFacts.length]}</p>
            <div className="relative flex justify-center gap-4">
              <Button
                className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
                onClick={() => setAccepted(true)}
              >
                Yes
              </Button>
              <motion.button
                className="bg-gray-300 text-black px-6 py-3 rounded-xl absolute"
                onClick={handleNoClick}
                animate={{ scale: noButtonSize }}
                style={{ top: noButtonPosition.top, left: noButtonPosition.left }}
              >
                No
              </motion.button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center">
          <Confetti />
          {!showFinalMessage ? (
            <h1 className="text-4xl font-bold text-red-600 transition-opacity duration-3000">Yay! 🥰 I love you! 💖</h1>
          ) : (
            <h1 className="text-2xl font-bold text-red-600">See you next week Thursday and Friday for dinner!! 🍽️💖</h1>
          )}
        </div>
      )}
    </div>
  );
}
