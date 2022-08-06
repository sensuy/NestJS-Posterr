
import ICreateQuotetDTO from "../dtos/ICreateQuotetDTO";
import Quote from "./typeorm/entities/Quote";

interface IQuoteRepository {
  save(quote: Quote): Promise<Quote>;
}

export default IQuoteRepository;