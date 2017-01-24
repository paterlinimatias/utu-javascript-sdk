const diverted = {};

/**
 * Returns the indexed key for the user
 * @method getDivertedKey
 * @param  {String}  platform          the platform the user is on
 * @param  {String}  platformId        the users id on the given platform
 * @return {String}                    the users diversion key
 */
const getDivertedKey = (platform, platformId) => `${platform}-${platformId}`;

/**
 * Diverts a bot from sending messages if the user
 * specified is tag to not have messages sent or processed
 * @method divert
 * @param  {String}  platform          the platform the user is on
 * @param  {String}  platformId        the users id on the given platform
 * @param  {Boolean} [divertUser=true] should the user diverted
 */
export const divert = (platform, platformId, divertUser = true) => {
  if (divertUser) {
    diverted[getDivertedKey(platform, platformId)] = divertUser;
  } else {
    delete diverted[getDivertedKey(platform, platformId)];
  }
};

/**
 * Returns whether or not the user is diverted
 * @method isDiverted
 * @param  {String}  platform          the platform the user is on
 * @param  {String}  platformId        the users id on the given platform
 * @return {Boolean}                   is the user diverted
 */
export const isDiverted = (platform, platformId) => !!diverted[getDivertedKey(platform, platformId)];
