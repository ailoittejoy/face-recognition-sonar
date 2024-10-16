const faceapi = require('face-api.js');
const canvas = require('canvas');
const { faceDetectionNet, faceDetectionOptions } = require('face-api.js');
const { Canvas, Image } = require('canvas');

faceapi.env.monkeyPatch({ Canvas, Image });
// Load models and configure face-api.js
const loadModels = async () => {
	await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
	await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
	await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
	console.log('Model loaded successfully')
};

// Function to detect faces in an image
const detectFaces = async (image) => {
	const img = await canvas.loadImage(`${image.destination}/${image.filename}`);
	const detections = await faceapi
		.detectAllFaces(img, faceDetectionOptions)
		.withFaceLandmarks()
		.withFaceDescriptors();
	return detections;
};

const compareFaces = async (user, detections) => {
	try {
		// Compare detected face with the user's face descriptor
		const distanceThreshold = 0.6; // Adjust this threshold based on your recognition accuracy
		const descriptions = [];
		for (j = 0; j < user.faceDescriptor.length; j++) {
			descriptions[j] = new Float32Array(Object.values(user.faceDescriptor[j]));
		}
		const labeledDescriptors = new faceapi.LabeledFaceDescriptors(user.userName, descriptions);
		const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
		const results = detections.map((detection) =>
			faceMatcher.findBestMatch(detection.descriptor)
		);
		console.log('results', results);
		const matchedUser = results.find((result) => result.label === user.userName);
		console.log('matchedUser', matchedUser);
		return matchedUser ? matchedUser._distance < distanceThreshold : false;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};
const getFaceDescriptor = async (images) => {
	try {
		const descriptions = [];
		// Loop through the images
		for (let i = 0; i < images.length; i++) {
			const img = await canvas.loadImage(`${images[i].destination}/${images[i].filename}`);
			// Read each face and save the face descriptions in the descriptions array
			const detections = await faceapi
				.detectSingleFace(img)
				.withFaceLandmarks()
				.withFaceDescriptor();
			if (detections) {
				descriptions.push(detections.descriptor);
			}
		}
		return descriptions;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports = { detectFaces, compareFaces, getFaceDescriptor, loadModels };
