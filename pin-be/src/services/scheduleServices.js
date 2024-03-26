import chunk from '../helpers/chunk';
import {getReadyQueue} from '../repositories/pinQueueRepository';
import {createNewPin} from './pinterestServices';

export const queueHandlers = async () => {
  try {
    const queues = getReadyQueue();
    const queueChunks = chunk(queues, 50);
    for (const queueChunk of queueChunks) {
      console.log('One chunk at a time');
      await Promise.all(queueChunk.map(queue => createNewPin(queue)));
    }
    console.log('Queue done');
  } catch (e) {
    console.error(e);
  }
};
