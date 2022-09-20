import {QueryExecutor} from "./queryExecutor";
import {QueryExplanation} from "./queryExplanation";
import { v4 as uuidv4 } from 'uuid';
import {arrayEquality} from "../utils/generalUtils";
import {Logger} from "tslog";
import {loggerSettings} from "../utils/loggerSettings";

export class QueryExecutorFactory extends Factory<string, QueryExecutor> {
  private readonly logger = new Logger(loggerSettings);

  constructor() {
    super(QueryExecutor);
  }

  public queryExplanationToUUID(queryExplanation: QueryExplanation): string {
    //TODO this probably can be done in a better way
    // standardize the query explanation and then use a hashmap to look for a uuid

    let queryExecutor: QueryExecutor | undefined;
    this.getKeyValuePairs((value) => {
      if (!value.queryExplanation) {
        throw new Error("query explanation is not defined for query with UUID: " + value.key);
      }
      if (!(value.queryExplanation.queryString === queryExplanation.queryString)) {
        this.logger.debug("queryString");
        return;
      }
      else if (!arrayEquality(value.queryExplanation.sources, queryExplanation.sources)) {
        this.logger.debug("sources");
        return;
      }
      else if (!(value.queryExplanation.comunicaContext === queryExplanation.comunicaContext)) {
        this.logger.debug("context");
        return;
      }
      else if (!(value.queryExplanation.reasoningRules === queryExplanation.reasoningRules)) {
        this.logger.debug("reasoningRules");
        return;
      }
      else if (!(value.queryExplanation.comunicaVersion === queryExplanation.comunicaVersion)) {
        this.logger.debug("comunicaVersion");
        return;
      }
      else if (value.queryExplanation.lenient != queryExplanation.lenient) {
        this.logger.debug("lenient");
        return;
      }
      queryExecutor = value;
      return;
    });
    if (queryExecutor) {
      this.logger.warn("query: \n"+ JSON.stringify(queryExplanation) +" \nalready exists!");
      return queryExecutor.key;
    }
    else {
      return uuidv4();
    }
  }
}
