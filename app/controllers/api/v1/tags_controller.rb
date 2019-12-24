class Api::V1::TagsController < ApplicationController
    def index
        # most popular tags at the top
        render json: ActsAsTaggableOn::Tag.all.order(taggings_count: :desc)
    end
end
