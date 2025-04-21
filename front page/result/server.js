let votes = {
  candidateA: 0,
  candidateB: 0,
  candidateC: 0,
  NOTA: 0,
};

function broadcastVotes() {
  const totalVotes =
    votes.candidateA + votes.candidateB + votes.candidateC + votes.NOTA;

  const data = {
    ...votes,
    percentA: totalVotes ? (votes.candidateA / totalVotes) * 100 : 0,
    percentB: totalVotes ? (votes.candidateB / totalVotes) * 100 : 0,
    percentC: totalVotes ? (votes.candidateC / totalVotes) * 100 : 0,
    NOTA: totalVotes ? (votes.NOTA / totalVotes) * 100 : 0,
    winner: getWinner(),
  };

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function getWinner() {
  const maxVotes = Math.max(...Object.values(votes));
  const winners = Object.entries(votes)
    .filter(([_, count]) => count === maxVotes)
    .map(([key]) => key);

  return winners.length > 1 ? "Tie" : winners[0];
}
