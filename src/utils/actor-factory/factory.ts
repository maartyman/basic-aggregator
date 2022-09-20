/**
 * @class
 * The Factory class makes unique instances of an Actor based on a given key.
 */
class Factory<Key, Value extends Actor<Key, any, any>> {
  protected map = new Map<Key, Value>();
  protected actor: new (key: Key) => Value;

  /**
   * The constructor of the Factory class.
   *
   * @param actor - The class of the actor function
   */
  constructor(actor: new (key: Key) => Value) {
    this.actor = actor;
  }

  /**
   * The getKeyValuePairs() method executes a provided function once per each key/value pair in the Map object, in insertion order.
   *
   * @param callbackFn - Function to execute for each entry in the map. It takes the following arguments: value (Value), key (Key), map (Map<Key, Value>)
   */
  public getKeyValuePairs(callbackFn: (value: Value, key: Key, map: Map<Key, Value>) => void) {
    this.map.forEach(callbackFn);
  }

  /**
   * The getOrCreate() method returns a class based on the given Key. If no class with the given key exists the method will return a new class, otherwise it will return an existing class.
   *
   * @param key - The key.
   * @param parent? - The parent class to which a link needs to be made.
   * @param actor? - Another initializer that extends the actor of this Factory.
   */
  public getOrCreate(key: Key, parent?: any, actor?: new (key: Key) => Value): Value {
    let element = this.map.get(key);

    if (!element) {
      element = new this.actor(key);
      this.map.set(key, element);
    }

    if (parent) {
      element.makeLink(parent, element);
    }

    return element;
  };

  /**
   * The get() method returns an actor class if exists.
   *
   * @param key - The key of the actor class.
   */
  public get(key: Key): Value | undefined {
    return this.map.get(key);
  }

  /**
   *  The deleteActor() method safely deletes an actor from the factory and also deletes its instance.
   *
   *  @param key - The key of the actor class.
   */
  public deleteActor(key: Key) {
    const v = this.map.get(key);
    if (v){
      v.delete();
    }
  }

  /**
   *  The removeActorFromFactory() method removes the actor from the factory but doesn't delete the instance. This method can cause memory overflow if not used correctly.
   *
   *  @param key - The key of the actor class.
   */
  public removeActorFromFactory(key: Key) {
    const v = this.map.get(key);
    if (v){
      this.map.delete(key);
    }
  }
}
