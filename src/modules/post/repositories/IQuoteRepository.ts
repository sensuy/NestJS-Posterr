
import ICreateQuotetDTO from "../dtos/ICreateQuotetDTO";
import Quote from "./typeorm/entities/Quote";

interface IQuoteRepository {
  create(data: ICreateQuotetDTO): Quote;
  save(quote: Quote): Promise<Quote>;
}

export default IQuoteRepository;