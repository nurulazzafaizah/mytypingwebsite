<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Array dengan kalimat panjang dan lebih banyak
$sentences = [
    "The quick brown fox jumps over the lazy dog. It has been running tirelessly across the fields, chasing after something unseen, driven by its instinct and untamed energy.",
    "Typing fast improves your accuracy and speed. With consistent practice, your fingers become more agile, allowing you to effortlessly glide over the keyboard while maintaining high precision.",
    "Practice makes perfect, keep improving every day. The journey towards mastery is filled with small victories, persistent efforts, and countless moments of determination that shape your expertise.",
    "Coding is fun when you solve real-world problems. Every challenge presents an opportunity to explore new solutions, refine your logic, and contribute to building something impactful for people worldwide.",
    "Stay focused and keep pushing forward! No matter how tough the road ahead might seem, resilience and determination will always pave the way to success, as long as you keep moving forward.",
    "Developers craft intricate systems by breaking complex tasks into manageable pieces. Through strategic problem-solving, innovative thinking, and persistent debugging, they turn abstract ideas into functional realities.",
    "A well-designed user interface enhances the overall user experience, making navigation intuitive and seamless. Color schemes, layout structures, and interactive elements all contribute to the perfect digital interaction.",
    "Technology evolves rapidly, demanding constant learning and adaptation. Keeping up with new advancements, understanding emerging trends, and refining one’s skills ensure continuous growth in this dynamic field.",
    "The art of programming is like composing a symphony, where each line of code plays a crucial role in the harmony of the entire system, creating seamless functionality and meaningful experiences.",
    "Innovation stems from curiosity, persistence, and creativity. By experimenting with fresh ideas and refining existing concepts, new breakthroughs emerge that redefine industries and shape the future of technology."
];

// Konversi ke format JSON
echo json_encode($sentences);
?>