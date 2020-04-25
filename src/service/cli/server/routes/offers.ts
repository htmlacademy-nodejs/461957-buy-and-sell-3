import {Request, Response, Router} from "express";
import offersService from "../services/offers.service";
import {HttpCodes} from "../../../../shared/http-codes";
import {NewOffer, Offer, OfferType} from "../../../../types/offer";
import {OfferKey, OfferValidationResponse, ValidationError} from "../../../../types/offer-validation-response";
import {NotFoundError} from "../errors/not-found-error";
import {OfferComment} from "../../../../types/offer-comment";
import {CommentValidationResponse} from "../../../../types/comment-validation-response";

const offersRouter: Router = Router();

offersRouter.get(`/`, async (req: Request, res: Response) => {
  res.json(await offersService.getOffers());
});
offersRouter.get(`/:id`, async (req: Request, res: Response) => {
  const offerId = req.params.id;
  try {
    const offer = await offersService.getOfferById(offerId.toString());
    if (offer !== null) {
      res.json(offer);
    } else {
      res.status(HttpCodes.NOT_FOUND).send();
    }
  } catch (e) {
    console.error(e);
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});
offersRouter.post(`/`, async (req: Request, res: Response) => {
  const offer = req.body as NewOffer;
  const validationResponse = getOfferValidationResponse(offer, [`id`]);
  if (validationResponse !== null) {
    res.status(HttpCodes.BAD_REQUEST).send(validationResponse);
    return;
  }
  try {
    res.send(await offersService.addOffer(offer));
  } catch (e) {
    console.error(e);
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});
offersRouter.put(`/`, async (req: Request, res: Response) => {
  const offer = req.body as Offer;
  const validationResponse = getOfferValidationResponse(offer);
  if (validationResponse !== null) {
    res.status(HttpCodes.BAD_REQUEST).send(validationResponse);
    return;
  }
  try {
    res.send(await offersService.updateOffer(offer));
  } catch (e) {
    console.error(e);
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});
offersRouter.delete(`/:id`, async (req: Request, res: Response) => {
  const offerId = req.params.id;
  try {
    await offersService.deleteOfferById(offerId);
    res.send();
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.log(e);
      res.status(HttpCodes.NOT_FOUND).send();
    }
    console.error(e);
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});
offersRouter.get(`/:id/comments`, async (req: Request, res: Response) => {
  const offerId = req.params.id;
  try {
    res.send(await offersService.getOfferComments(offerId));
  } catch (e) {
    console.log(e);
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});
offersRouter.delete(`/:id/comments/:commentId`, async (req: Request, res: Response) => {
  const offerId = req.params.id;
  const commentId = req.params.commentId;
  try {
    res.send(await offersService.deleteCommentById(offerId, commentId));
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.error(e);
      res.status(HttpCodes.NOT_FOUND).send();
    }
    console.error(e);
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});
offersRouter.post(`/:id/comments`, async (req: Request, res: Response) => {
  const offerId = req.params.id;
  const comment = req.body as OfferComment;
  const validationResponse = getCommentValidationResponse(comment);
  if (validationResponse !== null) {
    res.status(HttpCodes.BAD_REQUEST).send(validationResponse);
    return;
  }
  try {
    res.send(await offersService.createComment(offerId, comment));
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.log(e);
      res.status(HttpCodes.NOT_FOUND).send();
    } else {
      console.log(e);
      res.status(HttpCodes.BAD_REQUEST).send();
    }
  }
});

function getOfferValidationResponse(offer: Offer | NewOffer, skipFields: OfferKey[] = []): OfferValidationResponse | null {
  const validationResponse: OfferValidationResponse = {};
  if (!offer.id && !skipFields.includes(`id`)) {
    validationResponse.id = ValidationError.REQUIRED;
  }
  if (!offer.picture) {
    validationResponse.picture = ValidationError.REQUIRED;
  }
  if (!offer.title) {
    validationResponse.title = ValidationError.REQUIRED;
  }
  if (!offer.type || !((offer.type as string) === OfferType.SELL || (offer.type as string) === OfferType.BUY)) {
    validationResponse.type = ValidationError.REQUIRED;
  }
  if (!offer.description) {
    validationResponse.description = ValidationError.REQUIRED;
  }
  if (!offer.category.length) {
    validationResponse.category = ValidationError.REQUIRED;
  }
  if (!offer.sum) {
    validationResponse.sum = ValidationError.REQUIRED;
  }

  if (Object.keys(validationResponse).length) {
    return validationResponse;
  }
  return null;
}

function getCommentValidationResponse(comment: OfferComment): CommentValidationResponse | null {
  const validationResponse: CommentValidationResponse = {};
  if (!comment.text) {
    validationResponse.text = ValidationError.REQUIRED;
  }
  if (Object.keys(validationResponse).length) {
    return validationResponse;
  }
  return null;
}

export default offersRouter;
