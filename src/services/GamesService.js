import axios from 'axios';


/**
 * This is the game service
 * handle all the request that should go to the games API
 */
class GameServices {
  /**
   * get the info about a game
   * @param  {string}  game [description]
   * @return {Promise}      [description]
   */
  static async getGame(game) {
    return axios(`back/api/games/${game.toLowerCase()}`);
  }

  /**
   * insert a player to a game
   * @param  {object}  game   [description]
   * @param  {string}  player [description]
   * @return {Promise}        [description]
   */
  static async insertPlayer(game, player) {
    // TODO: fix game.name
    return axios.post(`back/api/games/stars/players`, {
      name: player,
      points: 0,
    })
    .then(result => result.data);
  }

  static async updatePlayer(game, player) {
    console.log(player);
    return axios.put(`api/games/stars/players/${player._id}`, {
      name: player.name,
      points: player.points
    });
  }
}


export default GameServices;
